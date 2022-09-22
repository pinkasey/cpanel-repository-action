const core = require('@actions/core');
const axios = require('axios');

const main = async () => {

    const timeStart = new Date();
    try {
        const hostname = core.getInput('hostname', {required: true});
        const port = core.getInput('cPanelApiPort', {required: true});
        const repository_root = core.getInput('repository_root', {required: true});
        const branch = core.getInput('branch', {required: true});
        const cpanel_token = core.getInput('cpanel_token', {required: true});
        const cpanel_username = core.getInput('cpanel_username', {required: true});

        const baseUrl = `${hostname}:${port}/execute`;
        core.info(`baseUrl: '${baseUrl}'`);
        const updateRepoEndpoint = baseUrl + "/VersionControl/update";

        let updateRes = await axios.get(updateRepoEndpoint, {
            port: port,
            params: {
                repository_root,
                branch,
            },
            headers: {"Authorization": `cpanel ${cpanel_username}:${cpanel_token}`}
        });
        updateRes = updateRes.data;
        core.debug(`updateRes: ${JSON.stringify(updateRes, null, 2)}`);
        if (updateRes.errors !== null) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(updateRes.errors);
        }

        const duration = new Date() - timeStart;
        const commitHash = updateRes.last_update?.identifier;
        const commitMessage = updateRes.last_update?.identifier;
        const commitAuthor = updateRes.last_update?.author;
        const commitDate = updateRes.last_update?.date;

        core.setOutput("duration", duration);
        core.setOutput("commitHash", commitHash);
        core.setOutput("commitMessage", commitMessage);
        core.setOutput("commitAuthor", commitAuthor);
        core.setOutput("commitDate", commitDate);
        core.info(`deployment duration: ${duration}`);
    } catch (error) {
        const duration = new Date() - timeStart;
        const errorBody = error.response?.data;
        core.info(`failed deployment duration: ${duration}`);
        core.debug(`errorBody: ${errorBody}`);
        core.setOutput("duration", duration);

        core.setFailed(error.message + (errorBody == null ? "" : `\n${errorBody}` ));
    }
};

main();

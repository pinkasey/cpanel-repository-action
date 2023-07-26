# cpanel-repository-action
This action updates a repository that is installed in a cPanel site, using the cPanel API.


| **Parameter**       | **Required**       | **Default Value** | **Example Value**                        | **Notes**                                                                                                              |
|---------------------|--------------------|-------------------|------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **hostname**        | :white_check_mark: |                   | `https://hostname.example.com`           | Hostname of cPanel installation, including protocol.                                                                   |
| **cPanelApiPort**   |                    | `2083`            | `2083`                                   | Port of cPanel API. Don't change it unless you know what you're doing.                                                 |
| **cpanel_token**    | :white_check_mark: |                   | `${{ secrets.CPANEL_TOKEN }}`            | CPanel API token, used for authorization. You should store this as a repository-secret.                                |
| **cpanel_username** | :white_check_mark: |                   | `joe`                                    | CPanel username used for API calls. Must be the same username used to create the token.                                |  
| **repository_root** | :white_check_mark: |                   | `'/home/joe/repositories/my_repository'` | Folder in which the repository is installed in the target cPanel account                                               |  
| **branch**          | :white_check_mark: |                   | `'main'`                                 | Branch to checkout and update. Be careful when setting this parameter - it may change the checked-out branch in cPanel |  
| **timout**          |                    | `5000`            | `15000`                                  | http timeout (in milliseconds) for the command sent to cPanel. Default is 5000 (5 seconds)                             |

## Example usage
```
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to cPanel
        id: deploy
        uses: pinkasey/cpanel-repository-action@v1.0.0
        with:
          hostname: 'https://hostname.example.com'
          cpanel_token: '${{ secrets.CPANEL_TOKEN }}'
          cpanel_username: 'joe'
          repository_root: '/home/my_account/repositories/my_repository'
          branch: main
      - name: echo deploy-duration
        run: echo "Deployment took ${{ steps.deploy.outputs.duration }} milliseconds"
```

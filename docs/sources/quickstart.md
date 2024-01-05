Napse is still in early stage. You can only run it manually for now.

??? tip "TL - DR"

    1. `make setup`
    2. `make up`

    3. Clone [django-napse](https://github.com/napse-invest/django-napse) repository
    4. Run `tests/test_app/setup_secrets.sh` and fill in `secrets.json` file
    5. `make up`
    6. Get `master_key` in `secrets.json` file
    7. Add localhost server into Napse's desktop app (with the `master_key` as `API Token`)

---
## Prerequisites

### Install nvm

To install nvm, download and install the nvm script from the project's GitHub page:


=== "Linux"

    ```shell
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    nvm --version
    ```

=== "MacOS"

    Please follow this [tutorial](https://dev.to/csituma/install-nvm-on-mac-windows-and-linux-1aj9)

=== "Windows"

    Please follow this [tutorial](https://dev.to/csituma/install-nvm-on-mac-windows-and-linux-1aj9)


### Install Node.js

Now, you can install Node.js. The following command installs Node.js latest version :

=== "Linux"

    ```shell
    nvm install --lts
    ```

=== "MacOS"

    Please follow this [tutorial](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

=== "Windows"

    Please follow this [tutorial](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

### Install yarn

Yarn is a Node package manager. Install it by running these commands


=== "Linux"

    ```shell
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update
    sudo apt install yarn
    ```

=== "MacOS"

    Please follow this [tutorial](https://www.hostinger.com/tutorials/how-to-install-yarn)

=== "Windows"

    Please follow this [tutorial](https://www.hostinger.com/tutorials/how-to-install-yarn)

---
## Run the desktop application

First, you need to install all dependencies.
```shell
make setup
```
    
Then, you can run the application.
```shell
make up
```

Yeah! Your desktop application is running. But you can't do anything with it for now. You need to run the server.

---
## The server

The heart of Napse is the server. It's [django-napse](https://github.com/napse-invest/django-napse)

### Setup the server

#### Clone the project from github

First clone the repository to your local machine:
```bash
git clone git@github.com:napse-invest/django-napse.git
```

#### Build the virtual environment:

To setup the virtual environment, you can run the command:
```bash
make setup
```
Or run manually the following script depending on your operating system:

=== "Linux"

    ```bash
    source setup/setup-unix.sh
    ```

=== "MacOS"

    ```bash
    source setup/setup-osx.sh
    ```

=== "Windows"

    ```powershell
    .\setup\setup-windows.ps1
    ```

#### Setup initial exchange accounts

To make full use of the project, we recommend that you fill in the API keys of at least one exchange (see [django-napse documentation](https://napse-invest.github.io/django-napse/) for more details).

At `tests/test_app/`, build a `secret.json` file (or run the `./setup_secrets.sh` script). Here is an exemple with Binance:
```json
{
    "Exchange Accounts": {
        "Binance EA_NAME": {
            "exchange": "BINANCE",     # Name of your exchange (BINANCE, DYDX, ...)
            "testing": true,
            "public_key": "YOUR_PUBLIC_KEY",
            "private_key": "YOUR_PRIVATE_KEY"
        }
    }
}
```

You can create this file with the commande:
```bash
make setup-testing-environment
```

!!! tip

    Exchange API keys are required to communicate with the exchange. However, they are not required to test the application.


### Run the server

```bash
make makemigrations
make migrate
make runserver
```

## Connect the desktop app to the server

You've come this far! **Congratulations**!

Now all you have to do is the easy part:

1. Retrieve your `master_key` from the `secrets.json` file
2. Go to your desktop application
3. Click on `servers` in the top right-hand corner, then `+ add new`.
4.  Enter your `master_key` in the `API Token` field.
5. Click on `Connect`.

That's it ! **You can now use Napse !**
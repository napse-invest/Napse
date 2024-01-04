<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/theme/assets/napse_invest_logo_white.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/theme/assets/napse_invest_logo_black.svg">
  <img alt="Napse's logo" src="" width=500>
</picture>
</div>

<h1 align="center">
</h1>
<br>
<p align="center">
  <a href="https://twitter.com/NapseInvest">
    <img src="https://img.shields.io/twitter/follow/NapseInvest?style=flat&label=%40NapseInvest&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a>  
    <img src="https://img.shields.io/github/v/release/napse-invest/Napse" alt="Release" />
  </a>
</p>
<br/>


Napse is the future of open source investment. It connects seamlessly to exchanges and manages the money entrusted to it with trading bots.

Napse is a desktop application compatible with all platforms. [Django-napse](https://github.com/napse-invest/django-napse) is the heart of the system, and Napse enables efficient deployment, operation and performance visualization.










# Napse

The best open source investment software.

### Runing the graphic user interface

The GUI is a desktop app. It is made using Electron, React and Typescript.  
You can find it in the desktop-app folder.  
Here are the steps to run it (if you already have nvm, node and yarn installed, go to the step 4 directly):

1. **Install nvm**

To install nvm, download and install the nvm script from the project's GitHub page:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

After installing nvm, close your terminal and open a new one. Verify the installation by checking the version of nvm:

```shell
nvm --version
```

2. **Install Node.js**

Now, you can install Node.js. The following command installs Node.js latest version :

```shell
nvm install --lts
```

3. **Install yarn**

Yarn is a Node package manager. Install it by running these commands

```shell
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
```

```shell
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

```shell
sudo apt update
```

```shell
sudo apt install yarn
```

4. **Install dependencies**

Start by moving to the desktop-app folder

```shell
cd desktop-app
```

Then use yarn to download all dependencies

```shell
yarn
```

5. **Run the client**

Use this yarn command to run client in dev mode

```shell
yarn dev
```

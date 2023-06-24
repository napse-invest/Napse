#! /usr/bin/env bash
sudo apt update
sudo apt install git-flow
sudo apt install python3
sudo apt install python3.11-dev
sudo apt install virtualenv
pip3 install --upgrade pip
pip install virtualenv
python3 -m virtualenv .venv --python=python3.11
printf "\n===============================================\nVirtual python environment has been created.\n"
source .venv/bin/activate
printf "Virtual python environment has been activated.\n"
pip install -r backend/requirements/base.txt
# pip install -r backend/requirements/local.txt
# pip install -r backend/requirements/production.txt
printf "\nThe following packages have been installed:\n"
pip freeze --local > requirements.txt
cat requirements.txt
printf "\nVersions saved to requirements.txt\n"
printf "Done installing requirements for local .venv!\nHave fun coding!\n"

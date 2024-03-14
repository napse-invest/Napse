all: setup up

setup:
	cd desktop-app && yarn

up:
	cd desktop-app && yarn start

update-version:
	./set-version.sh

build: update-version
	cd desktop-app && yarn build:all
.PHONY: init build

init:
	lerna bootstrap
	cd ./packages/blacksmith-eui && npm link && cd ../../

build:
	lerna run build

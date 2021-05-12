#
# init is a shortcut to initialize a proper development environment for all
# packages.
#
init:
	lerna bootstrap
	cd ./packages/blacksmith-eui && npm link && cd ../../

#
# build is a shortcut to build all packages and their related Storybook.
#
build:
	lerna run build
	lerna run build-storybook

#
# release is a shortcut to release all packages on to the npm registry.
#
release:
	lerna publish --skip-git

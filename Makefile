# Disable built-in rules
.SUFFIXES:

# set the default target to install
.DEFAULT_GOAL:=install

# env variables needed for installation
WEB_URL_ROOT?=/
WEB_INSTALL_ROOT?=/var/www/html/
ERMRESTJS_REL_PATH?=ermrestjs/
CHAISE_REL_PATH2=chaise-react/
OSD_VIEWER_REL_PATH?=openseadragon-viewer/

CHAISEDIR:=$(WEB_INSTALL_ROOT)$(CHAISE_REL_PATH2)
CHAISE_BASE_PATH:=$(WEB_URL_ROOT)$(CHAISE_REL_PATH2)

DIST=dist

.PHONY: install
install: $(DIST) build dont_install_in_root
	$(info - deploying the package)
	rsync -avz $(DIST)/ $(CHAISEDIR)

.PHONY: build
build: $(DIST)
	$(info - building the package)
	npm run webpack

dont_install_in_root:
	@echo "$(CHAISEDIR)" | egrep -vq "^/$$|.*:/$$"

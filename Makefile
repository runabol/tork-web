SHELL := /bin/bash
PROJECT_NAME ?= $(shell jq -r '.name' package.json)
PROJECT_VERSION ?= $(shell jq -r '.version' package.json)

.PHONY: docker-build
docker-build:
	docker build . -t runabol/tork-web:$(PROJECT_VERSION) 

.PHONY: docker-push
docker-push:
	@echo "$(DOCKER_PASSWORD)" | docker login -u $(DOCKER_LOGIN) --password-stdin
	docker push runabol/tork-web:$(PROJECT_VERSION)
	docker tag runabol/tork-web:$(PROJECT_VERSION) runabol/tork-web:latest
	docker push runabol/tork-web:latest

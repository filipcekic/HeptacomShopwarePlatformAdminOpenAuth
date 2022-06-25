SHELL := /bin/bash
PHP := $(shell which php) $(PHP_EXTRA_ARGS)
COMPOSER := $(PHP) $(shell which composer) $(COMPOSER_EXTRA_ARGS)
CURL := $(shell which curl)
JQ := $(shell which jq)
JSON_FILES := $(shell find . -name '*.json' -not -path './vendor/*' -not -path './.build/*')
PHPSTAN_FILE := dev-ops/bin/phpstan/vendor/bin/phpstan
COMPOSER_NORMALIZE_PHAR := https://github.com/ergebnis/composer-normalize/releases/download/2.22.0/composer-normalize.phar
COMPOSER_NORMALIZE_FILE := dev-ops/bin/composer-normalize
COMPOSER_REQUIRE_CHECKER_PHAR := https://github.com/maglnet/ComposerRequireChecker/releases/download/3.8.0/composer-require-checker.phar
COMPOSER_REQUIRE_CHECKER_FILE := dev-ops/bin/composer-require-checker
PHPMD_PHAR := https://github.com/phpmd/phpmd/releases/download/2.11.1/phpmd.phar
PHPMD_FILE := dev-ops/bin/phpmd
PSALM_FILE := dev-ops/bin/psalm/vendor/bin/psalm
COMPOSER_UNUSED_FILE := dev-ops/bin/composer-unused/vendor/bin/composer-unused
EASY_CODING_STANDARD_FILE := dev-ops/bin/easy-coding-standard/vendor/bin/ecs
PHPCHURN_FILE := dev-ops/bin/php-churn/vendor/bin/churn

.DEFAULT_GOAL := help
.PHONY: help
help: ## List useful make targets
	@echo 'Available make targets'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: all
all: clean it ## Cleans up and runs typical tests and style analysis

.PHONY: clean
clean: ## Cleans up all ignored files and directories
	[[ ! -d dev-ops/bin/shopware/vendor ]] || rm -f dev-ops/bin/shopware/vendor
	[[ ! -f composer.lock ]] || rm composer.lock
	[[ ! -d vendor ]] || rm -rf vendor
	[[ ! -d .build ]] || rm -rf .build
	[[ ! -f dev-ops/bin/composer-normalize ]] || rm -f dev-ops/bin/composer-normalize
	[[ ! -f dev-ops/bin/composer-require-checker ]] || rm -f dev-ops/bin/composer-require-checker
	[[ ! -d dev-ops/bin/composer-unused/vendor ]] || rm -rf dev-ops/bin/composer-unused/vendor
	[[ ! -d dev-ops/bin/easy-coding-standard/vendor ]] || rm -rf dev-ops/bin/easy-coding-standard/vendor
	[[ ! -f dev-ops/bin/phpmd ]] || rm -f dev-ops/bin/phpmd
	[[ ! -d dev-ops/bin/phpstan/vendor ]] || rm -rf dev-ops/bin/phpstan/vendor
	[[ ! -d dev-ops/bin/psalm/vendor ]] || rm -rf dev-ops/bin/psalm/vendor
	[[ ! -d dev-ops/bin/php-churn/vendor ]] || rm -rf dev-ops/bin/php-churn/vendor

.PHONY: build-administration
build-administration: vendor ## Builds any administration js, when administration is used
	[[ ! -d vendor/shopware/administration ]] || dev-ops/bin/shopware/bin/build-administration

.PHONY: it
it: cs-fix cs ## Fix code style

.PHONY: cs
cs: cs-ecs cs-phpstan cs-psalm cs-phpmd cs-soft-require cs-composer-unused cs-composer-normalize cs-json cs-phpchurn ## Run every code style check target

.PHONY: cs-ecs
cs-ecs: vendor .build $(EASY_CODING_STANDARD_FILE) ## Run easy-coding-standard for code style analysis
	$(PHP) $(EASY_CODING_STANDARD_FILE) check --config=dev-ops/ecs.php

.PHONY: cs-phpstan
cs-phpstan: vendor .build $(PHPSTAN_FILE) ## Run phpstan for static code analysis
	[[ -z "${CI}" ]] || $(PHP) $(PHPSTAN_FILE) analyse --level 6 -c dev-ops/phpstan.neon --error-format=junit > .build/phpstan.junit.xml
	[[ -n "${CI}" ]] || $(PHP) $(PHPSTAN_FILE) analyse --level 6 -c dev-ops/phpstan.neon

.PHONY: cs-psalm
cs-psalm: vendor .build $(PSALM_FILE) ## Run psalm for static code analysis
	$(PHP) $(PSALM_FILE) -c $(shell pwd)/dev-ops/psalm.xml

.PHONY: cs-phpmd
cs-phpmd: vendor .build $(PHPMD_FILE) ## Run php mess detector for static code analysis
	# TODO Re-add rulesets/unused.xml when phpmd fixes false-positive UnusedPrivateField
	$(PHP) $(PHPMD_FILE) --ignore-violations-on-exit src ansi rulesets/codesize.xml,rulesets/naming.xml
	[[ -f .build/phpmd-junit.xslt ]] || $(CURL) https://phpmd.org/junit.xslt -o .build/phpmd-junit.xslt
	$(PHP) $(PHPMD_FILE) src xml rulesets/codesize.xml,rulesets/naming.xml | xsltproc .build/phpmd-junit.xslt - > .build/php-md.junit.xml

.PHONY: cs-composer-unused
cs-composer-unused: vendor $(COMPOSER_UNUSED_FILE) ## Run composer-unused to detect once-required packages that are not used anymore
	$(PHP) $(COMPOSER_UNUSED_FILE) --no-progress

.PHONY: cs-soft-require
cs-soft-require: vendor .build $(COMPOSER_REQUIRE_CHECKER_FILE) ## Run composer-require-checker to detect library usage without requirement entry in composer.json
	$(PHP) $(COMPOSER_REQUIRE_CHECKER_FILE) check --config-file=$(shell pwd)/dev-ops/composer-soft-requirements.json composer.json

.PHONY: cs-composer-normalize
cs-composer-normalize: vendor $(COMPOSER_NORMALIZE_FILE) ## Run composer-normalize for composer.json style analysis
	$(PHP) $(COMPOSER_NORMALIZE_FILE) --diff --dry-run --no-check-lock --no-update-lock composer.json

.PHONY: cs-json
cs-json: $(JSON_FILES) ## Run jq on every json file to ensure they are parsable and therefore valid

.PHONY: cs-phpchurn
cs-phpchurn: vendor .build $(PHPCHURN_FILE) ## Run php-churn for prediction of refactoring cases
	$(PHP) $(PHPCHURN_FILE) run --configuration dev-ops/churn.yml --format text

.PHONY: $(JSON_FILES)
$(JSON_FILES):
	$(JQ) . "$@"

.PHONY: cs-fix ## Run all code style fixer that change files
cs-fix: cs-fix-composer-normalize cs-fix-ecs

.PHONY: cs-fix-composer-normalize
cs-fix-composer-normalize: vendor $(COMPOSER_NORMALIZE_FILE) ## Run composer-normalize for automatic composer.json style fixes
	$(PHP) $(COMPOSER_NORMALIZE_FILE) --diff composer.json

.PHONY: cs-fix-ecs
cs-fix-ecs: vendor .build $(EASY_CODING_STANDARD_FILE) ## Run easy-coding-standard for automatic code style fixes
	$(PHP) $(EASY_CODING_STANDARD_FILE) check --config=dev-ops/ecs.php --fix

$(PHPSTAN_FILE): ## Install phpstan executable
	$(COMPOSER) install -d dev-ops/bin/phpstan

$(COMPOSER_NORMALIZE_FILE): ## Install composer-normalize executable
	$(CURL) -L $(COMPOSER_NORMALIZE_PHAR) -o $(COMPOSER_NORMALIZE_FILE)

$(COMPOSER_REQUIRE_CHECKER_FILE): ## Install composer-require-checker executable
	$(CURL) -L $(COMPOSER_REQUIRE_CHECKER_PHAR) -o $(COMPOSER_REQUIRE_CHECKER_FILE)

$(PHPMD_FILE): ## Install phpmd executable
	$(CURL) -L $(PHPMD_PHAR) -o $(PHPMD_FILE)

$(PSALM_FILE): ## Install psalm executable
	$(COMPOSER) install -d dev-ops/bin/psalm

$(COMPOSER_UNUSED_FILE): ## Install composer-unused executable
	$(COMPOSER) install -d dev-ops/bin/composer-unused

$(EASY_CODING_STANDARD_FILE): ## Install easy-coding-standard executable
	$(COMPOSER) install -d dev-ops/bin/easy-coding-standard

$(PHPCHURN_FILE): ## Install php-churn executable
	$(COMPOSER) install -d dev-ops/bin/php-churn

vendor:
	[[ -f vendor/autoload.php ]] || $(COMPOSER) install

.PHONY: .build
.build:
	[[ -d .build ]] || mkdir .build

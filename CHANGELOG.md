# Changelog

## [Unreleased]

### Added

### Fixed

- Updated the test for the wall collision feature

## [1.2.0] - 2025-06-18

### Added

- Added `.github/dependabot.yml` to enable automated dependency and security updates.
- The snake now hunts and targets smaller opponent snakes, pursuing their heads when a safe path is available.
- Added the a-star path finding algorithm
- Added JSDoc comments
- Generated HTML Documentation
- Added GitHub Actions

### Fixed

- FIxed the snake movement logic, as a response to bugs encountered (downwards moving only)

## [1.1.0] - 2025-05-21

### Added

- ISSUE_TEMPLATES with templates for both user stories and tasks
- Tail collision prediction system
- Ability to move into opponent tails that will move
- Food-aware tail movement validation
- Added jest and eslint plugins for testing
- Extensive unit tests for core modules including:
  - Head-to-head collision detection
  - Other snakes collision logic
  - Tail collision handling
  - Food targeting functions
- Increased overall automated test coverage to over 98%
- Jest coverage reporting configured and maintained
- Implemented flood fill algorithm to evaluate accessible board space for snake AI decisions
- Added intelligent snake move selection based on maximizing future accessible space
- Introduced Test-Driven Development (TDD) with Jest tests covering flood fill and move decision logic
- Version bump to 1.1.0 in `package.json`
- Updated `package-lock.json` for deterministic builds
- Included changelog update for 1.1.0 release

### Changed

- Updated collision detection logic in `other-snakes-collision.js`
- Modified movement strategy to consider moving tails
- Finalized dependencies and devDependecies for minor release

## [1.0.1] - 2025-05-20

### Fixed

- Hotfix: Updated the snakes apperance
- Hotfix: Update CHANGELOG

## [1.0.0] - 2025-04-30

First major release.

### Added

- Added and configured default prettier
- Added and configured eslint
- Added and cofigured .editorconfig
- Pull Request template
- CHANGELOG.md file
- Added a food targeting feature

### Fixed

- Refactored folder structure for clarity.
- Fixed linting errors

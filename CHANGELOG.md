# Changelog

## [Unreleased]

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

### Changed 
- Updated collision detection logic in `other-snakes-collision.js`
- Modified movement strategy to consider moving tails

## [1.0.1] - 2025-05-20

### Fixed
- Hotfix: Updated the snakes apperance

## [1.0.0] - 2025-04-30
First major release. 

### Added 
- Added and configured default prettier
- Added and configured eslint
- Added and cofigured .editorconfig
- Pull Request template
- CHANGELOG.md file
-  Added a food targeting feature
 
### Fixed 
- Refactored folder structure for clarity.
- Fixed linting errors

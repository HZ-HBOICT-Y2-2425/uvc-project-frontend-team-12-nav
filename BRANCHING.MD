# Branching Model

## Branches
1. **main**:
   - Stable, production-ready code.
   - No direct commits allowed; changes must be merged via pull requests.

2. **develop**:
   - Integration branch for ongoing development.
   - New features are merged here before going to `main`.

3. **feature/<name>**:
   - Temporary branches for new features or fixes.
   - Merged into `develop` when work is complete.

## Workflow
1. Create a new branch from `develop` for each feature or fix.
2. Work on the branch and commit changes.
3. Open a pull request to merge the branch into `develop`.
4. Once changes are tested and approved, merge `develop` into `main`.

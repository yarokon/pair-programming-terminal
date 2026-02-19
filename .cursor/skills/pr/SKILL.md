---
name: pr
description: Prepare and create a pull request following project standards
---

Prepare and create a pull request following project standards.

IMPORTANT: This skill MUST NOT apply any code changes. The only modification it may make is creating a changeset file (via the changeset commands below). All other files must remain untouched.

## Title convention

The PR title MUST follow the conventional commits format: `<type>(<scope>): <subject>`

- **Types**: `feat`, `fix`, `docs`, `chore`, `tests`
- **Scopes**: `reunite`, `realm`, `other`, `deps`, `deps-dev`
- **Subject**: Concise description in imperative mood (e.g., "add feature", "fix bug")

## Description template

You MUST use the literal structure from `.github/pull_request_template.md`. Do not remove section headers or checkboxes.

- **What/Why/How?**: Provide a concise summary of the changes, why they were made, and how they work.
- **Reference**: Link to related issues, Slack conversations, or other resources.
- **Testing**: Describe how you tested the changes.
- **Check yourself**: Review and check/uncheck the checkboxes based on your changes.
- **Security**: Review and check the security boxes.

## Changesets

Determine if a changeset is needed (user-facing changes in Reunite or Realm):

- For **Reunite** user-facing changes: run `pnpm changeset:reunite --empty`
- For **Realm** user-facing changes: run `pnpm changeset:realm --empty`
- If **NOT user-facing**: skip the changeset and ensure the `no-changeset-needed` label is added to the PR.

### Changeset message guidelines

Follow the guidelines and templates in `docs/intranet/engineering/changelog-process.md`.

## Submission via GitHub CLI

Ensure user has GitHub CLI installed and authorized:
- **Install**: `brew install gh`
- **Authorize**: `gh auth login`

### Command to create PR

Push the branch with upstream tracking, then create a draft PR unless user did not request a regular PR.

IMPORTANT: The `git push -u` command MUST NOT run in the sandbox.

```bash
git push -u origin HEAD
```

Then create the PR (include `--draft` by default; omit it when user requests a regular PR):

```bash
gh pr create --draft --title "<type>(<scope>): <subject>" --body "$(cat <<'EOF'
<COMPLETED_TEMPLATE_CONTENT>
EOF
)"
```

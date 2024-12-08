# Advent of Code 2024

I have these filters and put `GIT_IGNORE_START` and `GIT_IGNORE_END` before and after my `const input = "..."` lines.

```sh
git config filter.ignoreSection.clean 'sed "/GIT_IGNORE_START/,/GIT_IGNORE_END/d"'
git config filter.ignoreSection.smudge cat
```

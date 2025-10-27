# BMAD v6 Alpha Upgrade Notes

## Upgrade Summary

**Date**: October 27, 2024
**From**: BMAD v4.43.0
**To**: BMAD v6.0.0-alpha.0

## What Changed

### Structure Changes
- Old structure (v4): Flat `.bmad-core/` with agents/tasks/templates
- New structure (v6): Modular `.bmad-core/` with `core/`, `bmb/`, `bmd/` modules

### Modules Installed
- **core**: Core BMAD framework and base agents
- **bmb**: BMAD Builder - For creating custom agents/workflows/modules
- **bmd**: BMAD Development - For maintaining BMAD itself (framework contributors)

### What Was Preserved
- Project-specific `core-config.yaml` settings migrated from v4
- All custom project documentation remains intact

### What Was Backed Up
- Old v4 `.bmad-core/` → `.bmad-core.backup-v4/`
- Old v4 slash commands → `.claude/commands/BMad-v4-backup/`

## Installation Status

### ✅ Completed
- [x] BMAD v6 alpha files copied to `.bmad-core/`
- [x] Project configuration migrated to `core-config.yaml`
- [x] Old v4 installation backed up

### ⚠️ Incomplete
- [ ] Slash commands for Claude Code (`.claude/commands/bmad/`)
  - **Reason**: v6 installer requires interactive input
  - **Status**: Need to run installer manually or wait for non-interactive option

## How to Complete Installation

### Option 1: Manual Installer (Recommended)
```bash
cd /path/to/BMAD-METHOD-v6-clone
npm install
npm run install:bmad
# When prompted for installation directory:
# Enter: /Users/nan.w/Documents/GitHub/invest-with-billionaires
# Select IDE: claude-code
# Select modules: core, bmb (skip bmd unless contributing to BMAD)
```

### Option 2: Manual Command Creation
Create slash commands manually in `.claude/commands/bmad/` based on v6 structure.

## v6 Alpha Known Issues

From the v6 repository:
- This is an **alpha release** - expect bugs and changes
- Installer may have issues with non-interactive mode
- Some agents may still be in development
- Documentation is evolving

## v6 Alpha Benefits

### New Agent System
- Modular architecture (core, bmb, bmd)
- Better separation of concerns
- Specialized agents for framework development (bmd)
- Agent builder tools (bmb)

### Workflow System
- New workflow execution model
- Better workflow composition
- Clearer workflow documentation

### Configuration
- Cleaner config structure
- Module-specific configurations
- Better IDE integration

## Rolling Back to v4

If needed, restore v4:
```bash
rm -rf .bmad-core
cp -r .bmad-core.backup-v4 .bmad-core
rm -rf .claude/commands/BMad
cp -r .claude/commands/BMad-v4-backup .claude/commands/BMad
```

## Next Steps

1. **Complete v6 installation**:
   - Run installer interactively OR
   - Manually create slash commands

2. **Test v6 agents**:
   - Try activating core agents
   - Verify workflows work
   - Check project config is recognized

3. **Update workflows**:
   - Review v6 workflow structure
   - Update any custom agents/workflows to v6 format
   - Test integration with existing project docs

4. **Report issues**:
   - If bugs found, report to: https://github.com/bmad-code-org/BMAD-METHOD/issues
   - Tag as v6-alpha

## Resources

- **v6 Repository**: https://github.com/bmad-code-org/BMAD-METHOD/tree/v6-alpha
- **v6 Documentation**: [View in repo](https://github.com/bmad-code-org/BMAD-METHOD/tree/v6-alpha/docs)
- **BMAD Discord**: https://discord.gg/gk8jAdXWmj

## Project Configuration (Preserved)

The following project-specific settings were migrated to v6:

```yaml
markdownExploder: true
qa:
  qaLocation: docs/qa
prd:
  prdFile: docs/prd.md
  prdVersion: v4
  prdSharded: true
  prdShardedLocation: docs/prd
  epicFilePattern: epic-{n}*.md
architecture:
  architectureFile: docs/architecture.md
  architectureVersion: v4
  architectureSharded: true
  architectureShardedLocation: docs/architecture
devLoadAlwaysFiles:
  - docs/architecture/coding-standards.md
  - docs/architecture/tech-stack.md
  - docs/architecture/source-tree.md
devDebugLog: .ai/debug-log.md
devStoryLocation: docs/stories
slashPrefix: BMad
```

All your project documentation (PRD, epics, design docs) remains intact and accessible.

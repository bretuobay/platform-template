# AI Coding Agents Setup Guide

This repository includes comprehensive AI coding assistant instructions optimized for multiple AI tools.

## 📁 Files Overview

| File | Purpose | AI Tools |
|------|---------|----------|
| `AI_INSTRUCTIONS.md` | **Complete reference guide** - Comprehensive documentation with templates, patterns, and examples | All AI tools (primary reference) |
| `.cursorrules` | **Condensed rules** - Quick reference optimized for Cursor IDE and similar tools | Cursor, Windsurf, VSCode extensions |
| `.clinerules` | **Claude-specific rules** - Optimized for Claude Code CLI and Claude-based tools | Claude Code, Claude Dev, Cline |
| `base-repo-architecture.md` | **Detailed architecture** - In-depth architectural decisions and patterns | Reference for all AIs when deep context is needed |

## 🤖 AI Tool Configuration

### Claude Code (CLI)
```bash
# Claude Code automatically reads .clinerules
# No configuration needed - just run:
claude-code
```

### Cursor IDE
```bash
# Cursor automatically reads .cursorrules
# Simply open the project in Cursor
```

### GitHub Copilot
```bash
# In your editor, reference the AI_INSTRUCTIONS.md file
# Add to your workspace settings or use #file references
# Example in VSCode settings.json:
{
  "github.copilot.advanced": {
    "contextFiles": ["AI_INSTRUCTIONS.md"]
  }
}
```

### Windsurf / Cascade
```bash
# Windsurf reads .cursorrules automatically
# Additional context can be provided via chat:
# "Read AI_INSTRUCTIONS.md for project structure"
```

### OpenAI Codex / ChatGPT Canvas
```bash
# Manually reference the AI_INSTRUCTIONS.md file:
# "I'm working on a project. Please read AI_INSTRUCTIONS.md
# in my repository for the coding standards and structure."
```

### Google Jules / Amazon Kiro
```bash
# Reference AI_INSTRUCTIONS.md in your prompts:
# "Follow the patterns and structure defined in AI_INSTRUCTIONS.md"
```

### Replit Agent
```bash
# Reference AI_INSTRUCTIONS.md in the initial prompt
# The agent will use it as context throughout the session
```

## 🎯 How to Use

### For Quick Tasks
AI agents will automatically reference `.cursorrules` or `.clinerules` depending on the tool.

**Example:**
```
"Add a Button component to the UI package"
```

### For Complex Tasks
Reference `AI_INSTRUCTIONS.md` for comprehensive templates and patterns.

**Example:**
```
"Create a new feature package for todos.
Follow the structure in AI_INSTRUCTIONS.md"
```

### For Deep Architectural Questions
Reference `base-repo-architecture.md` for detailed explanations.

**Example:**
```
"Read base-repo-architecture.md and explain
the data fetching pattern"
```

## ✅ Best Practices for AI Prompts

### Good Prompts
```
✅ "Create packages/feature-auth with Bulletproof structure"
✅ "Add POST /api/users endpoint following the Hono pattern"
✅ "Create a DatePicker component in packages/ui with dark mode support"
✅ "Add formatDate utility with tests to packages/utils"
```

### Bad Prompts
```
❌ "Make the app better" (too vague)
❌ "Add everything for users" (too broad)
❌ "Use Node.js fs in the worker" (violates rules)
❌ "Import from feature internals" (violates boundaries)
```

## 📋 Quick Start Checklist

When starting a new task with an AI agent:

1. **Ensure AI has access to rules**
   - [ ] `.cursorrules` or `.clinerules` is in root directory
   - [ ] AI tool supports automatic rule loading
   - [ ] Or manually reference `AI_INSTRUCTIONS.md`

2. **Verify project context**
   - [ ] Node version is 20+ (preferably 23.x)
   - [ ] Dependencies are installed (`npm install`)
   - [ ] Project builds successfully (`npm run build`)

3. **Provide clear context**
   - [ ] Specify which package/app you're working in
   - [ ] Mention similar existing code to follow
   - [ ] Clarify if it's client-side, server-side, or edge code

4. **Review AI output**
   - [ ] Check imports use barrel exports only
   - [ ] Verify TypeScript strict mode compliance
   - [ ] Ensure tests are included (for utils/services)
   - [ ] Confirm no Node.js APIs in worker code

## 🔄 Updating AI Instructions

When you modify the architecture:

1. **Update `base-repo-architecture.md`** - Detailed changes
2. **Update `AI_INSTRUCTIONS.md`** - Add templates/patterns
3. **Update `.cursorrules`** - Sync quick reference rules
4. **Update `.clinerules`** - Sync Claude-specific rules

**Keep all files in sync to ensure consistency across AI tools.**

## 🆘 Troubleshooting

### AI isn't following the structure
**Solution:** Explicitly reference the instruction files in your prompt:
```
"Read AI_INSTRUCTIONS.md and follow the feature package structure exactly"
```

### AI is using deep imports
**Solution:** Remind the AI of barrel export rules:
```
"Only import from barrel exports. No deep imports allowed."
```

### AI is adding Node.js APIs to workers
**Solution:** Emphasize edge-safe requirements:
```
"This is worker code. Use only web standard APIs (Fetch, crypto.subtle).
No Node.js modules allowed."
```

### AI isn't writing tests
**Solution:** Explicitly request tests:
```
"Add unit tests in __tests__/ covering happy path and edge cases"
```

## 🎓 Training AI Agents

For the best results, train your AI session at the start:

```
Hello! I'm working on a Turborepo monorepo with Bulletproof React architecture.

Please read these files for context:
1. AI_INSTRUCTIONS.md - Primary coding standards
2. base-repo-architecture.md - Detailed architecture

Key rules to remember:
- Only barrel exports (no deep imports)
- Features are self-contained packages
- Edge code uses web standard APIs only
- Test utils and services, not UI
- Match existing patterns exactly

Ready to start?
```

## 📊 File Size & Performance

| File | Size | Load Time | Best For |
|------|------|-----------|----------|
| `.cursorrules` | ~6KB | Instant | Quick tasks, IDE integration |
| `.clinerules` | ~5KB | Instant | Claude CLI sessions |
| `AI_INSTRUCTIONS.md` | ~35KB | Fast | Complex tasks, full context |
| `base-repo-architecture.md` | ~25KB | Fast | Architecture deep-dives |

**Recommendation:** Let AI tools auto-load `.cursorrules` or `.clinerules`, then reference `AI_INSTRUCTIONS.md` for complex tasks.

## 🔐 Security Note

These instruction files are:
- ✅ Safe to commit to version control
- ✅ Safe to share publicly (no secrets)
- ✅ Safe to include in AI context
- ❌ Do NOT include actual secrets, API keys, or credentials

## 📝 Template Usage

When using this template in a new project:

1. **Clone/copy the repository**
2. **Keep all AI instruction files**
3. **Customize `base-repo-architecture.md`** if you modify the architecture
4. **Update package namespace** from `@repo/*` to `@your-org/*`
5. **Configure AI tool** to read instruction files

The AI instruction files ensure consistency across all projects using this template.

## 🤝 Contributing

When contributing to a project using this template:

1. **Read the AI instructions** before making changes
2. **Follow the patterns** exactly as documented
3. **Update instructions** if you introduce new patterns
4. **Test with multiple AI tools** to ensure compatibility

## 📞 Support

If AI agents are consistently misunderstanding instructions:
1. Check file encoding (should be UTF-8)
2. Verify files are in repository root
3. Ensure AI tool supports instruction files
4. Try explicitly referencing files in prompts

## 🎉 Benefits

Using this AI setup provides:

✅ **Consistency** - All AI tools follow the same architecture
✅ **Efficiency** - No need to explain structure every time
✅ **Quality** - Best practices baked into AI workflows
✅ **Scalability** - Easy onboarding for new team members
✅ **Flexibility** - Works with any AI coding assistant

---

**Version:** 1.0.0
**Last Updated:** 2025-01-06
**Maintained by:** Repository maintainers

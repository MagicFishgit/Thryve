# Tryve
An extensible ERP system focusing on simplicity in UI and function.

### ✅ Node Version Management with `.nvmrc`

This project uses **https://github.com/nvm-sh/nvm** to ensure consistent Node.js versions across environments.

#### Why?
Native modules (like `better-sqlite3`) depend on Node’s ABI. If you switch Node versions without rebuilding, you’ll hit errors like:

```
Error: The module was compiled against a different Node.js version...
```

#### How to use `.nvmrc`
1. **Install nvm** (if not already):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
   ```

2. **Check the required Node version**:
   ```bash
   cat .nvmrc
   # Example output:
   22.21.0
   ```

3. **Switch to the correct version**:
   ```bash
   nvm use
   ```
   If you don’t have it installed:
   ```bash
   nvm install
   ```

4. **Optional automation**:
   Add this to your shell config (`~/.bashrc` or `~/.zshrc`) to auto-switch:
   ```bash
   cd() {
     builtin cd "$@" && [ -f .nvmrc ] && nvm use >/dev/null
   }
   ```

#### After switching Node:
Always reinstall dependencies:
```bash
rm -rf node_modules
npm install
```

---

Do you want me to also include a **section for CI/CD pipelines** showing how to respect `.nvmrc` in GitHub Actions or Docker?
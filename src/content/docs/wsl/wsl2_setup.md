---
title: WSL2 setup
description: WSL2 setup
---

## Install WSL2
- https://learn.microsoft.com/en-us/windows/wsl/install
- https://learn.microsoft.com/en-us/windows/wsl/setup/environment

### 1. Install WSL2 in powershell
```
wsl --install   (for the default distribution)

or

wsl --list --online   (list the distribution options)
wsl -l -o
wsl --install -d <Distribution Name>  (install with specific distribution options)
```

## 2 After install WSL2
```
sudo apt update && sudo apt upgrade
```

## 3. Install docker without docker desktop
- https://nickjanetakis.com/blog/install-docker-in-wsl-2-without-docker-desktop
```
```

## 4. Install SDKMAN (Java, maven, gradle)
- https://sdkman.io/install
```
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version
```

SDKMAN .bashrc config
```
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
```

## 5. Install pnpm
- https://pnpm.io/installation
```
```

pnpm .bashrc config
```
# pnpm
export PNPM_HOME="/home/<your wsl linux user name>/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
```


## 6. setup Github account SSH
```
ssh-keygen -t ed25519 -C "<your github email name>"
/home/<your wsl linux user name>/.ssh/github_<your wsl linux user name>_ed25519
Enter passphrase (password of github account)
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_<your wsl linux user name>_ed25519
ls -al ~/.ssh
cat ~/.ssh/github_<your wsl linux user name>_ed25519.pub   <- then copy the content and add to github SSH
login github, SSH and GPG keys, New SSH key
paste contents
```

update .bashrc to start ssh-agent every time when open a new terminal
```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_<your wsl linux user name>_ed25519
```

Setup 

NOTE: to store your project
```
\\wsl$\<DistroName>\home\<UserName>\Project
```
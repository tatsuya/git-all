# git-all

**git-all** is a command line utility to run [git command](https://git-scm.com/docs) under multiple git repositories concurrently.

## Installation

From NPM:

```
$ npm install -g git-all
```

## Usage

**git-all** command takes any [git command](https://git-scm.com/docs) as its first argument and runs that command under the sub directories of current directory where the `.git` directory is existed in.

Let's say you have the following files and directories:

```
~/Projects/
  cool-examples/
    .git/
  funny-movies/
  my-todos.txt
  super-express/
    .git/
```

And if you run *git-all status* command under `~/Projects` directory:

```
$ cd ~/Projects
$ git-all status
```

The command first tries to find the all git projects under `~/Projects` (in the above case `cool-examples` and `super-express` are the target), and executes `git status` command under that directories.

Is it boring? You can do whatever you want:

```
$ git-all fetch
$ git-all "reset HEAD --hard"
$ git-all "config user.email tatsuyaoiw@gmail.com"
```

You can also specify the path where the command is ran as the second argument.

```
$ git-all status ~/Projects
```

## Note

Currently, if your command get prompt (for example, requires username and password), this tool doesn't work properly. As a workaround you can cache your credentials using Git's credential cache.

- [Caching your GitHub password in Git - User Documentation](https://help.github.com/articles/caching-your-github-password-in-git/)
- [Git - git-credential-cache Documentation](https://git-scm.com/docs/git-credential-cache)

The following command caches your credentials locally for an hour.

```
$ git config --global credential.helper 'cache --timeout=3600'
```

## Test

Run:

```
$ npm test
```

## Licence

MIT
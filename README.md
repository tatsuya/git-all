# git-all

**git-all** runs [git command](https://git-scm.com/docs) under multiple git repositories concurrently.


## Installation

From NPM:

```
$ npm install -g git-all
```

## Usage

**git-all** basically takes any [git commands](https://git-scm.com/docs) as the first argument and run that given command under the sub directories in which the `.git` directory is existed.

Assume you have the following files and directories:

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

The command first tries to find the child git repositories under `~/Projects` (in the above case `cool-examples` and `super-express`), and then execute `git status` command under each of them in parallel.

Is it boring? You can do whatever you want:

```
$ git-all fetch
$ git-all checkout master
$ git-all reset HEAD --hard
```

You can also specify the path where the command is ran as the second argument.

```
$ git-all status ~/Projects
```

## Note

Currently, if your command get prompt (for example, requires username and password), this tool does not work properly. One way to workaround this is to cache your credentials using Git's credential cache.

- [Caching your GitHub password in Git - User Documentation](https://help.github.com/articles/caching-your-github-password-in-git/)
- [Git - git-credential-cache Documentation](https://git-scm.com/docs/git-credential-cache)

The following command caches your credentials locally for 1 hour.

```
$ git config --global credential.helper 'cache --timeout=3600'
```

Some other ways are also available. Take a look at [this](http://stackoverflow.com/questions/6565357/git-push-requires-username-and-password) if you are interested.

## Test

Run:

```
$ npm test
```

## Licence

MIT
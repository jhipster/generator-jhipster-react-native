## Upgrading

#### IgniteJHipster Upgrade Process

 - Make sure to upgrade ignite-jhipster by running `npm upgrade ignite-jhipster`
 - Use `ignite g upgrade` to upgrade any template files to their updated boilerplate code.
 - It's recommended to use `git` and branches to merge changes into your code. 
   - The command below will keep all of your changes while merging any updates.  If there are conflicts, you will need to manually merge the changes.
   - `git merge -s recursive -Xours <branch name>`

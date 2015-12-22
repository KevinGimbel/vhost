---
title: "Installation"
in_page_link: install
---

To Install vhost on your system clone the [GitHub Repository](https://github.com/kevingimbel/vhost) into a direction somewhere inside your `PATH` and make the file named vhost executable. You can also symlink the file into your path using the `ln -s` command.

Now link the `template.conf` file into the `/etc/apache2/sites-available` directory with `$ (sudo) ln -s /path/to/vhost/template.conf /etc/apache2/sites-available` This is the template from which all other virtual hosts are generated. Ypu can read more <a href="#template" title="Custom Virtual Host Templates">about custom templates below</a>.

Once placed somewhere inside the `PATH` try executing `vhost --version` to see if everything is working properly. This should print the current version as well as a copyright and pages with further information.

To see if your system is ready to work with run `vhost --test`. The `--test` command checks the minimal requirements and reports back to you.

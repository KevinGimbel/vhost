# 0.0.3 - 2016-01-12
### Added

* Colored output for test functiontion
* Check (✓) and Cross (❌) signs to test output
* custom error log directories in `/var/log/apache2` for every host

# 0.0.2 - 2015-10-08
### Added
* `remove` and `removeHost` function. `remove` handles the user input and
 decides if a Virtual Host should be removed. The User can answer
 `Y`,`y`,`Yes`,`yes` or `N`,`n`,`No`,`no` and based on this the script will then
 start removing the Virtual Host (if it exists) or abort the removal. The
 `removeHost` function cannot directly be called.
* Test function to test if files, folders and functions exist. Runable with
 `vhost --test`
* README sections about remove and test command and OS Note
* Added this CHANGELOG.md, added previous "changes"

### Changed
* `create` and `removeHost` now sent notifications via `notify-send` if the
programm is installed.


# 0.0.1 - 2015-10-06
### Added

* `templace.conf` as base configuration template
* `vhost` as executable script
* `README.md` for install, setup and usage information

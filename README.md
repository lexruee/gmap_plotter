# GmapPlotter

GmapPlotter is a little sinatra app for plotting gps points on a google map.

##Demo app

![Alt text](screenshot.png?raw=true "Screenshot")

A demo app runs on heroku:
[https://gmap-plotter.herokuapp.com/](https://gmap-plotter.herokuapp.com/)


## Installation

Add this line to your application's Gemfile:

```ruby
gem 'gmap_plotter'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install gmap_plotter

## Usage

###Running
To run the app open a terminal and enter the following command:
```
gmap_plotter
```

This command starts the app on ```http://localhost:3000```.

###Deployment

You can deploy you're own gmap plotter app by creating a ```config.ru``` rack config file.

Example ```config.ru``` file:
```
require 'gmap_plotter'
run GmapPlotter::Server
```
And run it via:
```
rackup config.ru -p 3000
```

## Contributing

1. Fork it ( https://github.com/[my-github-username]/gmap_plotter/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

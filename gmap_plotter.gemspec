# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'gmap_plotter/version'

Gem::Specification.new do |spec|
  spec.name          = "gmap_plotter"
  spec.version       = GmapPlotter::VERSION
  spec.authors       = ["Alexander Rueedlinger"]
  spec.email         = ["a.rueedlinger@gmail.com"]
  spec.summary       = %q{A little app for plotting gps points on a google map.}
  spec.description   = %q{Gmap Plotter is little app for plotting gps points on a google map.}
  spec.homepage      = "https://github.com/lexruee/gmap_plotter"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables << 'gmap_plotter'
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.7"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_runtime_dependency "sinatra", "~> 1.4"
  spec.add_runtime_dependency "sinatra-contrib", "~> 1.4"
end

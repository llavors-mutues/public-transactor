# This is an example of what downstream consumers of holonix should do
# This is also used to dogfood as many commands as possible for holonix
# For example the release process for holonix uses this file
let

 # point this to your local config.nix file for this project
 # example.config.nix shows and documents a lot of the options
 config = import ./config.nix;

 # START HOLONIX IMPORT BOILERPLATE
 holonix = import (
  if ! config.holonix.use-github
  then config.holonix.local.path
  else fetchTarball {
   url = "https://github.com/${config.holonix.github.owner}/${config.holonix.github.repo}/tarball/${config.holonix.github.ref}";
   sha256 = config.holonix.github.sha256;
  }
 ) { 
   config = config;

   holochainVersionId = "custom";
   
   holochainVersion = { 
    rev = "d2ce21aa51672328e162f9a5c8137ccba9efd5b8";  
    sha256 = "01mpwckh5wb1cl8s7bvin6sz870q2khcmljswn4xzq3if4lzjlx5";  
    cargoSha256 = "1ja1h1717jvvgmxghy4al9qbn5kk007914cisss7gzbn1x2kzbz7";
   };
 };
 # END HOLONIX IMPORT BOILERPLATE

in
with holonix.pkgs;
{
 dev-shell = stdenv.mkDerivation (holonix.shell // {
  name = "dev-shell";

  buildInputs = [ ]
   ++ holonix.shell.buildInputs
   ++ config.buildInputs
  ;
 });
}

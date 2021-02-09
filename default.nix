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
    rev = "8c62cb5888f491f08e6fdf13b6f3991f85a9801a";  
    sha256 = "1kqfchszkzqa68g9q3wlpay8sfzx37b0yzj4hvw3a8jf7w2lzajj";  
    cargoSha256 = "1kqfchszkzqa68g9q3wlpay8sfzx37b0yzj4hvw3a8jf7w2lzajj";
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

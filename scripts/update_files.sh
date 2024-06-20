#!/bin/bash

# Determine the script's directory
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Declare the packages to update
declare -A packages_to_update=(
  ["config-manager.main"]="dist/index.js"
  ["config-manager.module"]="dist/index.mjs"
  ["config-manager.types"]="dist/index.d.ts"
  ["config-manager.exports"]='{
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }'
  ["provider.main"]="dist/index.js"
  ["provider.module"]="dist/index.mjs"
  ["provider.types"]="dist/index.d.mts"
  ["provider.exports"]='{
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }'
  ["hooks.main"]="dist/index.js"
  ["hooks.module"]="dist/index.mjs"
  ["hooks.types"]="dist/index.d.mts"
  ["hooks.exports"]='{
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }'
  ["molecule.main"]="lib/index.js"
  ["molecule.module"]="es/index.js"
  ["molecule.browser"]="dist/index.js"
  ["molecule.style"]="dist/index.css"
  ["molecule.typings"]="lib/index.d.ts"
  ["page.main"]="lib/index.js"
  ["page.module"]="es/index.js"
  ["page.browser"]="dist/index.js"
  ["page.style"]="dist/index.css"
  ["page.typings"]="lib/index.d.ts"
)

# Function to update package.json
update_package_json() {
  local package=$1
  local key=$2
  local value=$3
  local package_json="$SCRIPT_DIR/../packages/$package/package.json"

  if [ -f "$package_json" ]; then
    if [[ "$key" == "exports" ]]; then
      # Use jq to update the exports field as it is a JSON object
      jq ". + {exports: $value}" "$package_json" > tmp.json && mv tmp.json "$package_json"
    else
      # Use jq to update simple key-value pairs
      jq --arg key "$key" --arg value "$value" '.[$key] = $value' "$package_json" > tmp.json && mv tmp.json "$package_json"
    fi
    echo "Updated $package_json: $key -> $value"
  else
    echo "Error: $package_json not found!"
  fi
}

for package_key in "${!packages_to_update[@]}"; do
  IFS='.' read -r package key <<< "$package_key"
  value=${packages_to_update[$package_key]}
  update_package_json "$package" "$key" "$value"
done

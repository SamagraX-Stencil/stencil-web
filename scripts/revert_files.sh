#!/bin/bash

# Exit script if any command fails
set -e

# Declare the original paths for the packages' main fields
declare -A original_paths=(
  ["config-manager.main"]="./index.ts"
  ["provider.main"]="./index.ts"
  ["hooks.main"]="./index.ts"
  ["molecules.main"]="./src/index.ts"
  ["pages.main"]="./src/index.ts"
)

# Determine the script's directory
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Function to revert the package.json
revert_package_json() {
  local package=$1
  local main_value=$2
  local package_json="$SCRIPT_DIR/../packages/$package/package.json"

  if [ -f "$package_json" ]; then
    # Use jq to update the main field and remove module, types, exports, browser, and style fields
    jq --arg main_value "$main_value" 'del(.module, .types, .exports, .browser, .style, .typings) | .main = $main_value' "$package_json" > "$package_json.tmp" && mv "$package_json.tmp" "$package_json"
    echo "Reverted $package_json: main -> $main_value, removed other fields"
  else
    echo "Error: $package_json not found!"
  fi
}

# Loop through each package key in the original_paths array
for package_key in "${!original_paths[@]}"; do
  # Split the package_key into package and key
  IFS='.' read -r package key <<< "$package_key"
  main_value=${original_paths[$package_key]}
  revert_package_json "$package" "$main_value"
done

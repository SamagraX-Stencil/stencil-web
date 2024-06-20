#!/bin/bash

set -e

read -p "Enter the new version: " new_version

# Determine the script's directory
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Define the root package.json path
ROOT_PACKAGE_JSON="$SCRIPT_DIR/../package.json"

# Debugging: Print the root package.json path
echo "Root package.json path: $ROOT_PACKAGE_JSON"

# Update version in root package.json
if [ -f "$ROOT_PACKAGE_JSON" ]; then
  jq ".version = \"$new_version\"" "$ROOT_PACKAGE_JSON" > "$ROOT_PACKAGE_JSON.tmp" && mv "$ROOT_PACKAGE_JSON.tmp" "$ROOT_PACKAGE_JSON"
  echo "Updated root package.json to version $new_version"
else
  echo "Error: $ROOT_PACKAGE_JSON not found!"
  exit 1
fi

# Define the packages directory path
PACKAGES_DIR="$SCRIPT_DIR/../packages"

# Debugging: Print the packages directory path
echo "Packages directory path: $PACKAGES_DIR"

for package in "$PACKAGES_DIR"/*; do
  if [ -d "$package" ]; then
    package_json="$package/package.json"

    # Debugging: Print the package.json path
    echo "Processing package.json path: $package_json"

    if [ -f "$package_json" ]; then
      package_name=$(basename "$package")

      jq ".version = \"$new_version\"" "$package_json" > "$package_json.tmp" && mv "$package_json.tmp" "$package_json"
      echo "Updated $package_name to version $new_version"

      dependencies=$(jq -r '.dependencies | keys[]' "$package_json" || true)
      devDependencies=$(jq -r '.devDependencies | keys[]' "$package_json" || true)

      for dep in $dependencies; do
        # Extract the package name after the "stencil-" prefix
        if [[ $dep == @samagra-x/* ]]; then
          dep_name="${dep#@samagra-x/}"

          # Check if the dependency is available in the packages directory
          if [ -d "$PACKAGES_DIR/$dep_name" ]; then
            jq ".dependencies[\"$dep\"] = \"$new_version\"" "$package_json" > "$package_json.tmp" && mv "$package_json.tmp" "$package_json"
            echo "Updated dependency $dep in $package_name to version $new_version"
          else
            echo "Dependency $dep not found in the packages directory. Skipping..."
          fi
        fi
      done

      for devDep in $devDependencies; do
        # Extract the devDependency name after the "stencil-" prefix
        if [[ $devDep == @samagra-x/* ]]; then
          devDep_name="${devDep#@samagra-x/}"

          if [ -d "$PACKAGES_DIR/$devDep_name" ]; then
            jq ".devDependencies[\"$devDep\"] = \"$new_version\"" "$package_json" > "$package_json.tmp" && mv "$package_json.tmp" "$package_json"
            echo "Updated devDependency $devDep in $package_name to version $new_version"
          else
            echo "DevDependency $devDep not found in the packages directory. Skipping..."
          fi
        fi
      done
    else
      echo "Error: $package_json not found for $package_name!"
    fi
  fi
done

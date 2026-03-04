#!/bin/bash
set -e

# Executa o build do Vite
bunx vite build

# Remove a pasta dist se existir
rm -rf build

# Renomeia a pasta build para dist
mv dist build

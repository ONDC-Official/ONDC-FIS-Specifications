#!/usr/bin/env python3
"""
Extract ONDC API payload examples from a flow JSON specification file into categorized action subfolders.

Usage:
    Interactive mode:
        python3 extract_examples.py

    Non-interactive CLI mode:
        python3 extract_examples.py --cli -i ../solar-json.json -o ./purchase-finance -f yaml
"""

import argparse
import json
import os
import sys

try:
    import yaml
except ImportError:
    yaml = None


def get_user_input(prompt_text, default_value):
    val = input(f"{prompt_text} [{default_value}]: ").strip()
    return val if val else default_value


def extract_examples(input_file, target_dir, file_format="yaml", naming_scheme="counter"):
    if not os.path.exists(input_file):
        print(f"\n❌ Error: Input file '{input_file}' does not exist.", file=sys.stderr)
        sys.exit(1)

    with open(input_file, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"\n❌ Error parsing JSON from '{input_file}': {e}", file=sys.stderr)
            sys.exit(1)

    steps = data.get("steps", [])
    if not steps:
        print(f"\n⚠️ Warning: No 'steps' array found in '{input_file}'.")
        return

    # Destination directory path
    target_dir = os.path.abspath(target_dir)
    os.makedirs(target_dir, exist_ok=True)
    print(f"\n📁 Target Directory: {target_dir}\n")

    api_counters = {}
    created_files = []

    for step_idx, step in enumerate(steps, start=1):
        api_name = step.get("api")
        if not api_name:
            print(f"Skipping step {step_idx}: Missing 'api' field.")
            continue

        action_id = step.get("action_id", f"{api_name}_{step_idx}")

        # Extract payload examples
        payloads = []

        # 1. Check step['examples']
        examples = step.get("examples", [])
        for ex in examples:
            if isinstance(ex, dict) and "payload" in ex:
                payloads.append(ex["payload"])
            elif isinstance(ex, dict) and "value" in ex:
                payloads.append(ex["value"])

        # 2. Fallback to mock -> defaultPayload
        if not payloads:
            mock_payload = step.get("mock", {}).get("defaultPayload")
            if mock_payload:
                payloads.append(mock_payload)

        if not payloads:
            print(f"Notice: No example payloads found for API '{api_name}' (step {step_idx}).")
            continue

        # Target action subfolder inside target_dir (e.g. target_dir/search, target_dir/on_search)
        api_dir = os.path.join(target_dir, api_name)
        if not os.path.exists(api_dir):
            os.makedirs(api_dir, exist_ok=True)
            print(f"  📂 Created folder: {api_name}/")
        else:
            print(f"  📂 Existing action folder '{api_name}/' found. Writing files directly inside.")

        for payload in payloads:
            if api_name not in api_counters:
                api_counters[api_name] = 1
            else:
                api_counters[api_name] += 1

            if naming_scheme == "action_id":
                base_name = action_id
            else:
                # e.g. search_request_1, search_request_2
                base_name = f"{api_name}_request_{api_counters[api_name]}"

            out_format = file_format.lower()
            filename = f"{base_name}.{out_format}"
            filepath = os.path.join(api_dir, filename)

            # Write payload to file
            with open(filepath, "w", encoding="utf-8") as out_f:
                if out_format == "yaml":
                    if yaml is None:
                        print("  ⚠️ PyYAML not installed, falling back to JSON format.", file=sys.stderr)
                        filepath = os.path.join(api_dir, f"{base_name}.json")
                        json.dump(payload, out_f, indent=2)
                    else:
                        yaml.dump(payload, out_f, sort_keys=False, allow_unicode=True)
                else:
                    json.dump(payload, out_f, indent=2)

            created_files.append(filepath)
            print(f"    📄 Written -> {os.path.relpath(filepath, target_dir)}")

    print(f"\n✅ Extraction complete! Total {len(created_files)} example file(s) saved in:\n   {target_dir}")


def main():
    parser = argparse.ArgumentParser(
        description="Extract endpoint example payloads from ONDC flow JSON file directly into target folder."
    )
    parser.add_argument("-i", "--input", help="Path to input JSON file")
    parser.add_argument("-o", "--output-dir", help="Target folder path (e.g. ./purchase-finance)")
    parser.add_argument("-f", "--format", choices=["yaml", "json"], help="Output file format: yaml or json")
    parser.add_argument("-n", "--naming", choices=["counter", "action_id"], help="Naming scheme: counter or action_id")
    parser.add_argument("--cli", action="store_true", help="Non-interactive CLI mode")

    args = parser.parse_args()

    default_input = "/Users/anujsharma/wits/ondc/FIS/ONDC-FIS-Specifications/api/components/solar-json.json"
    default_output = "/Users/anujsharma/wits/ondc/FIS/ONDC-FIS-Specifications/api/components/examples/purchase-finance"

    # Determine if we should prompt interactively
    if not args.cli and not (args.input and args.output_dir):
        print("========================================")
        print("  ONDC Payload Extractor (Interactive)  ")
        print("========================================\n")

        input_file = args.input or get_user_input("1. Enter input JSON file path", default_input)
        target_dir = args.output_dir or get_user_input("2. Enter destination folder path", default_output)
        file_format = args.format or get_user_input("3. Enter output file format (yaml/json)", "yaml")

        naming_choice = args.naming or get_user_input("4. Enter file naming scheme ('1' for search_request_1, '2' for action_id search_2)", "1")
        naming_scheme = "action_id" if naming_choice in ["2", "action_id"] else "counter"
    else:
        input_file = args.input or default_input
        target_dir = args.output_dir or default_output
        file_format = args.format or "yaml"
        naming_scheme = args.naming or "counter"

    extract_examples(input_file, target_dir, file_format, naming_scheme)


if __name__ == "__main__":
    main()

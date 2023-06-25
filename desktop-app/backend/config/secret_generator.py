"""Generate secrets for .django file of .env.

Run the script with the .env name as the first argument.

    backend/config/secret_generator.py <env_name>
"""

import sys
from pathlib import Path

from cryptography.fernet import Fernet


def build_secrets(env_name: str) -> None:
    """Build secrets for .django file of .env."""
    ROOT_DIR: str = Path(__file__).resolve(strict=True).parent.parent
    django_env_pathfile: str = f"{ROOT_DIR}/.envs/.{env_name}/.django"

    with open(django_env_pathfile, "r+") as env_file:
        content = env_file.readlines()
    env_file.close()

    secret_lines = [elt for elt in content if "=" in elt]
    generated_secrets = {}
    # Find empty keys
    for secret_line in secret_lines:
        key_value: list[str] = [elt.strip() for elt in secret_line.split("=")]
        if len(key_value) != 2:
            error_msg: str = f"Invalid secret for the key: {key_value[0]} in {django_env_pathfile}\nPlease respect the format: KEY=VALUE"
            raise ValueError(error_msg)

        if not key_value[1]:
            # Empty
            generated_secrets[key_value[0]] = Fernet.generate_key().decode()[:-1]

    # Write new secrest
    if generated_secrets:
        content = "".join(content)
        # Format
        content = content.replace(" = ", "=")
        content = content.replace("= ", "=")
        content = content.replace(" =", "=")

        for key, value in generated_secrets.items():
            content = content.replace(f"{key}=", f"{key}={value}")

        with open(django_env_pathfile, "w") as env_file:
            env_file.writelines(content)
        env_file.close()


if __name__ == "__main__":
    env_name = sys.argv[1]
    build_secrets(env_name)

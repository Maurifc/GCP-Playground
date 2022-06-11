# Asymmetric Key

The `asymetric key` in KMS lets you **download the public key** (to encrypt) and use a `GCloud command` to decrypt (private key is not exported).



## Requirements
- You need `openssl` and `gcloud` properly setup in your machine



## Create the key

First, create the keyring
```bash
gcloud kms keyrings create test \ # 'test' is the keyring name
    --location global
```

Now, create the asymmetric key
```bash
gcloud kms keys create asym-key \ # 'asym-key' is the key name
    --keyring test \
    --location global \
    --purpose "asymmetric-encryption" \ # Create a key of type 'asymetric' for encryption purpose (not signature)
    --default-algorithm "rsa-decrypt-oaep-2048-sha256"
```


## Encrypt

Download the `public key` (needed to encrypt things)
```bash
gcloud kms keys versions get-public-key 1 \ # get the first version (1) of public key
    --key asym-key \
    --keyring test \
    --location global  \
    --output-file pub.key # 'pub.key' is the file path where the public key is going to be downloaded
```

Use the `openssl` to encrypt `mysecret.txt` file using the public key you just 
```bash
openssl pkeyutl -in mysecret.txt \
    -encrypt \
    -pubin \
    -inkey pub.key \
    -pkeyopt rsa_padding_mode:oaep \
    -pkeyopt rsa_oaep_md:sha256 \
    -pkeyopt rsa_mgf1_md:sha256 \
    > mysecret.enc
```


# Decrypt

KMS don't allow you to `download the private key`, but you can use a `gcloud` command to decrypt things...
```bash
gcloud kms asymmetric-decrypt \
    --version 1 \ #! you need to use the same key version used when you downloaded the public key
    --key asym-key \
    --keyring test \
    --location global  \
    --ciphertext-file mysecret.enc \ # path to the file you just encrypted
    --plaintext-file mysecret.dec # path where the decrypted file will be saved
```

# Permissions

- To `encrypt files` you need to download the `public key`, so you need the permission `cloudkms.cryptoKeyVersions.viewPublicKey`
- To `decrypt files` you need to issue the proper `gcloud command` that needs the permission `cloudkms.cryptoKeyVersions.useToDecrypt`



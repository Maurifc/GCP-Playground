# Symnetric Key

The `symetric key` in KMS lets you `encrypt` or `decrypt` files using `GCloud command`. `You can´t download` the key.


## Requirements
- You need `gcloud` properly setup in your machine



## Create the key

First, create the keyring
```bash
gcloud kms keyrings create test \ # 'test' is the keyring name
    --location global
```

Now, create the symmetric key using the purpose `encryption`
```bash
gcloud kms keys create sym-key \
    --keyring test \
    --location global \
    --purpose "encryption"
```


## Encrypt

Encrypt the text file using the `gcloud command`
```bash
gcloud kms encrypt \
    --key sym-key \
    --keyring test \
    --location global  \
    --plaintext-file mysecret.txt \
    --ciphertext-file mysecret.enc
```

# Decrypt

Decrypt the file using the `gcloud command`
```bash
gcloud kms decrypt \
    --key sym-key \
    --keyring test \
    --location global  \
    --ciphertext-file mysecret.enc \
    --plaintext-file mysecret.dec
```

# Permissions

- To `encrypt files` you need the permission `cloudkms.cryptoKeyVersions.useToEncrypt`
- To `decrypt files` you need the permission `cloudkms.cryptoKeyVersions.useToDecrypt`

You can use these roles too:
```bash
roles/cloudkms.cryptoKeyEncrypter
```

```bash
roles/cloudkms.cryptoKeyDecrypter
```

```bash
roles/cloudkms.cryptoKeyEncrypterDecrypter
```
<<<<<<< HEAD
import { context, getOctokit } from '@actions/github'
import fetch from 'node-fetch'

import { resolveUpdateLog } from './updatelog.mjs'

const UPDATE_TAG_NAME = 'updater'
const UPDATE_JSON_FILE = 'update-fixed-webview2.json'
const UPDATE_JSON_PROXY = 'update-fixed-webview2-proxy.json'
=======
import fetch from "node-fetch";
import { getOctokit, context } from "@actions/github";
import { resolveUpdateLog } from "./updatelog.mjs";

const UPDATE_TAG_NAME = "updater";
const UPDATE_JSON_FILE = "update-fixed-webview2.json";
const UPDATE_JSON_PROXY = "update-fixed-webview2-proxy.json";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

/// generate update.json
/// upload to update tag's release asset
async function resolveUpdater() {
  if (process.env.GITHUB_TOKEN === undefined) {
<<<<<<< HEAD
    throw new Error('GITHUB_TOKEN is required')
  }

  const options = { owner: context.repo.owner, repo: context.repo.repo }
  const github = getOctokit(process.env.GITHUB_TOKEN)
=======
    throw new Error("GITHUB_TOKEN is required");
  }

  const options = { owner: context.repo.owner, repo: context.repo.repo };
  const github = getOctokit(process.env.GITHUB_TOKEN);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  const { data: tags } = await github.rest.repos.listTags({
    ...options,
    per_page: 10,
    page: 1,
<<<<<<< HEAD
  })

  // get the latest publish tag
  const tag = tags.find((t) => t.name.startsWith('v'))

  console.log(tag)
  console.log()
=======
  });

  // get the latest publish tag
  const tag = tags.find((t) => t.name.startsWith("v"));

  console.log(tag);
  console.log();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  const { data: latestRelease } = await github.rest.repos.getReleaseByTag({
    ...options,
    tag: tag.name,
<<<<<<< HEAD
  })

  const updateData = {
    name: tag.name,
    notes: await resolveUpdateLog(tag.name), // use Changelog.md
    pub_date: new Date().toISOString(),
    platforms: {
      'windows-x86_64': { signature: '', url: '' },
      'windows-aarch64': { signature: '', url: '' },
      'windows-x86': { signature: '', url: '' },
      'windows-i686': { signature: '', url: '' },
    },
  }

  const promises = latestRelease.assets.map(async (asset) => {
    const { name, browser_download_url } = asset

    // win64 url
    if (name.endsWith('x64_fixed_webview2-setup.exe')) {
      updateData.platforms['windows-x86_64'].url = browser_download_url
    }
    // win64 signature
    if (name.endsWith('x64_fixed_webview2-setup.exe.sig')) {
      const sig = await getSignature(browser_download_url)
      updateData.platforms['windows-x86_64'].signature = sig
    }

    // win32 url
    if (name.endsWith('x86_fixed_webview2-setup.exe')) {
      updateData.platforms['windows-x86'].url = browser_download_url
      updateData.platforms['windows-i686'].url = browser_download_url
    }
    // win32 signature
    if (name.endsWith('x86_fixed_webview2-setup.exe.sig')) {
      const sig = await getSignature(browser_download_url)
      updateData.platforms['windows-x86'].signature = sig
      updateData.platforms['windows-i686'].signature = sig
    }

    // win arm url
    if (name.endsWith('arm64_fixed_webview2-setup.exe')) {
      updateData.platforms['windows-aarch64'].url = browser_download_url
    }
    // win arm signature
    if (name.endsWith('arm64_fixed_webview2-setup.exe.sig')) {
      const sig = await getSignature(browser_download_url)
      updateData.platforms['windows-aarch64'].signature = sig
    }
  })

  await Promise.allSettled(promises)
  console.log(updateData)
=======
  });

  const updateData = {
    name: tag.name,
    notes: await resolveUpdateLog(tag.name), // use updatelog.md
    pub_date: new Date().toISOString(),
    platforms: {
      "windows-x86_64": { signature: "", url: "" },
      "windows-aarch64": { signature: "", url: "" },
      "windows-x86": { signature: "", url: "" },
      "windows-i686": { signature: "", url: "" },
    },
  };

  const promises = latestRelease.assets.map(async (asset) => {
    const { name, browser_download_url } = asset;

    // win64 url
    if (name.endsWith("x64_fixed_webview2-setup.nsis.zip")) {
      updateData.platforms["windows-x86_64"].url = browser_download_url;
    }
    // win64 signature
    if (name.endsWith("x64_fixed_webview2-setup.nsis.zip.sig")) {
      const sig = await getSignature(browser_download_url);
      updateData.platforms["windows-x86_64"].signature = sig;
    }

    // win32 url
    if (name.endsWith("x86_fixed_webview2-setup.nsis.zip")) {
      updateData.platforms["windows-x86"].url = browser_download_url;
      updateData.platforms["windows-i686"].url = browser_download_url;
    }
    // win32 signature
    if (name.endsWith("x86_fixed_webview2-setup.nsis.zip.sig")) {
      const sig = await getSignature(browser_download_url);
      updateData.platforms["windows-x86"].signature = sig;
      updateData.platforms["windows-i686"].signature = sig;
    }

    // win arm url
    if (name.endsWith("arm64_fixed_webview2-setup.nsis.zip")) {
      updateData.platforms["windows-aarch64"].url = browser_download_url;
    }
    // win arm signature
    if (name.endsWith("arm64_fixed_webview2-setup.nsis.zip.sig")) {
      const sig = await getSignature(browser_download_url);
      updateData.platforms["windows-aarch64"].signature = sig;
    }
  });

  await Promise.allSettled(promises);
  console.log(updateData);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  // maybe should test the signature as well
  // delete the null field
  Object.entries(updateData.platforms).forEach(([key, value]) => {
    if (!value.url) {
<<<<<<< HEAD
      console.log(`[Error]: failed to parse release for "${key}"`)
      delete updateData.platforms[key]
    }
  })

  // 生成一个代理github的更新文件
  // 使用 https://hub.fastgit.xyz/ 做github资源的加速
  const updateDataNew = JSON.parse(JSON.stringify(updateData))
=======
      console.log(`[Error]: failed to parse release for "${key}"`);
      delete updateData.platforms[key];
    }
  });

  // 生成一个代理github的更新文件
  // 使用 https://hub.fastgit.xyz/ 做github资源的加速
  const updateDataNew = JSON.parse(JSON.stringify(updateData));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  Object.entries(updateDataNew.platforms).forEach(([key, value]) => {
    if (value.url) {
      updateDataNew.platforms[key].url =
<<<<<<< HEAD
        'https://download.clashverge.dev/' + value.url
    } else {
      console.log(`[Error]: updateDataNew.platforms.${key} is null`)
    }
  })
=======
        "https://download.clashverge.dev/" + value.url;
    } else {
      console.log(`[Error]: updateDataNew.platforms.${key} is null`);
    }
  });
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  // update the update.json
  const { data: updateRelease } = await github.rest.repos.getReleaseByTag({
    ...options,
    tag: UPDATE_TAG_NAME,
<<<<<<< HEAD
  })

  // delete the old assets
  for (const asset of updateRelease.assets) {
=======
  });

  // delete the old assets
  for (let asset of updateRelease.assets) {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    if (asset.name === UPDATE_JSON_FILE) {
      await github.rest.repos.deleteReleaseAsset({
        ...options,
        asset_id: asset.id,
<<<<<<< HEAD
      })
=======
      });
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }

    if (asset.name === UPDATE_JSON_PROXY) {
      await github.rest.repos
        .deleteReleaseAsset({ ...options, asset_id: asset.id })
<<<<<<< HEAD
        .catch(console.error) // do not break the pipeline
=======
        .catch(console.error); // do not break the pipeline
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }
  }

  // upload new assets
  await github.rest.repos.uploadReleaseAsset({
    ...options,
    release_id: updateRelease.id,
    name: UPDATE_JSON_FILE,
    data: JSON.stringify(updateData, null, 2),
<<<<<<< HEAD
  })
=======
  });
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  await github.rest.repos.uploadReleaseAsset({
    ...options,
    release_id: updateRelease.id,
    name: UPDATE_JSON_PROXY,
    data: JSON.stringify(updateDataNew, null, 2),
<<<<<<< HEAD
  })
=======
  });
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

// get the signature file content
async function getSignature(url) {
  const response = await fetch(url, {
<<<<<<< HEAD
    method: 'GET',
    headers: { 'Content-Type': 'application/octet-stream' },
  })

  return response.text()
}

resolveUpdater().catch(console.error)
=======
    method: "GET",
    headers: { "Content-Type": "application/octet-stream" },
  });

  return response.text();
}

resolveUpdater().catch(console.error);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

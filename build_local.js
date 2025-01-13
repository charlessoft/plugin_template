import fs from 'fs';
import path  from 'path';
import archiver  from 'archiver';
import { fileURLToPath } from 'url';


// copy directory
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

async function createZipFromManifest() {
    try {
        // 获取当前模块的文件路径
        const __filename = fileURLToPath(import.meta.url);
        // 获取当前模块的目录路径
        const __dirname = path.dirname(__filename);

        // Define paths
        const manifestPath = path.join(__dirname, 'manifest.json');
        const manifestLocalPath = path.join(__dirname, 'manifest_local.json');
        const manifestBackupPath = path.join(__dirname, 'manifest_bak.json');

        // Backup manifest.json
        fs.copyFileSync(manifestPath, manifestBackupPath);
        console.log('Backed up manifest.json to manifest_bak.json');

        // Replace manifest.json with manifest_local.json
        fs.copyFileSync(manifestLocalPath, manifestPath);
        console.log('Replaced manifest.json with manifest_local.json');

        // Copy img to dist
        const imgSrcPath = path.join(__dirname, 'img');
        const imgDestPath = path.join(__dirname, 'dist', 'img');
        copyDirectory(imgSrcPath, imgDestPath);

        // Read the manifest to get the id
        const manifestData = fs.readFileSync(manifestPath, 'utf8');
        const manifest = JSON.parse(manifestData);

        // 获取 id 值
        const id = manifest.id;
        if (!id) {
            throw new Error('manifest.json does not contain an id field');
        }
        console.log(`plugin id: ${id}`);

        // 创建压缩文件名
        const outputFilePath = path.join(__dirname, `${id}.zip`);
        const output = fs.createWriteStream(outputFilePath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // 设置压缩级别
        });

        output.on('close', () => {
            console.log(`${archive.pointer()} total bytes`);
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        output.on('end', () => {
            console.log('Data has been drained');
        });

        archive.on('warning', (err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);

        // 添加目录到压缩包
        archive.directory('dist/', false);

        // 添加 manifest.json 文件到压缩包
        archive.file(manifestPath, { name: 'manifest.json' });
        // 完成压缩
        await archive.finalize();
        console.log(`Created zip file: ${outputFilePath}`);

        // Restore the original manifest.json
        fs.copyFileSync(manifestBackupPath, manifestPath);
        console.log('Restored original manifest.json from manifest_bak.json');
    } catch (error) {
        console.error('Error creating zip file:', error);
    }
}

// 调用函数
createZipFromManifest();

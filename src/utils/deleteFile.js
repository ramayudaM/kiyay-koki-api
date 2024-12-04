const { promises: fs } = require('fs');
const path = require('path');

const deleteFile = async (filePath) => {
  try {
    const absolutePath = path.resolve(__dirname, '../..', filePath);
    await fs.unlink(absolutePath);
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw new Error(`Failed to delete file: ${filePath}, Error: ${error.message}`);
  }
};

module.exports = deleteFile;

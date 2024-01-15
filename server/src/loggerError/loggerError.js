const fs = require('fs');

module.exports = (error) => {
  const errorLog = {
    message: error.message,
    time: Date.now(),
    code: error.code || 500,
    stackTrace: error.stack
  };

  fs.appendFileSync('error.log', JSON.stringify(errorLog) + '\n');
};

const copyAndTransformLog = () => {
  if (fs.existsSync('error.log')) {
    const originalContent = fs.readFileSync('error.log', 'utf8');
    const transformedContent = originalContent.split('\n')
      .filter(line => line)
      .map(line => {
        const error = JSON.parse(line);

        return JSON.stringify({
          message: error.message,
          code: error.code,
          time: error.time
        });
      }).join('\n');

      const newFileName = `error_${new Date().toISOString().split('T')[0]}.log`;
    fs.writeFileSync(newFileName, transformedContent);
    fs.writeFileSync('error.log', '');
  }

  setTimeout(copyAndTransformLog, 24 * 60 * 60 * 1000);
};

copyAndTransformLog();

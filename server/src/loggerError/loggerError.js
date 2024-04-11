const fs = require('fs');
const { Cron } = require('croner');

module.exports = (error) => {
  const errorLog = {
    message: error.message,
    time: Date.now(),
    code: error.code || 500,
    stackTrace: error.stack
  };

  fs.appendFileSync('logs/error.log', JSON.stringify(errorLog) + '\n');
};

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const copyAndTransformLog = () => {
  if (fs.existsSync('logs/error.log')) {
    const originalContent = fs.readFileSync('logs/error.log', 'utf8');
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

    const newFileName = `logs/error_${new Date().toISOString().split('T')[0]}.log`;
    fs.writeFileSync(newFileName, transformedContent);
    fs.writeFileSync('logs/error.log', '');
  }
};

const job = new Cron('0 0 * * *', copyAndTransformLog);

job.schedule();

copyAndTransformLog();

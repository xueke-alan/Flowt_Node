
const cryptoJS = require('crypto-js/crypto-js')
/**
 * @description: 生成一个hash密码
 * @param password  原密码
 * @param salt  盐值
 * @param saltRounds  迭代次数
 * @param keySize  hash长度
 * @return: 返回hash对象，包含salt, saltRounds, hashedPassword
 * */
// 由于密码不通过http传输给后端，故不通过后端对原始密码进行hash加密。

function hashPassword(password,
  salt = '12',
  saltRounds = generateRandomNumber(4000, 6000),
  keySize = 8
) {
  const startTime = performance.now(); // 记录开始时间


  const hashedPassword = cryptoJS.PBKDF2(password, salt, {
    keySize: 8,
    iterations: 5714
  }).toString(cryptoJS.enc.Hex)


  const endTime = performance.now(); // 记录结束时间
  const executionTime = endTime - startTime; // 计算代码执行毫秒数
  console.log(executionTime + "ms");
  return { salt, saltRounds, hashedPassword };
}

/**
 * @description: 生成一个随机数，可以生成一个迭代次数
 * @param min  最小值
 * @param max  最大值
 * @return: 返回值是一个介于这之间的整数
 * */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
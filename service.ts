/**
 *
 * 截流函数
 */
function intercept(fun: (...data: any) => any) {
  var time: NodeJS.Timeout;
  return function (...data: any) {
    time && clearTimeout(time);
    time = setTimeout(() => {
      fun(...arguments);
    }, 200);
  };
}

export {intercept};

(() => {
  const pluck = (...props) => item => {
    return Object.keys(item).reduce((acc, key) => {
      if(props.some(prop => prop === key)) {
        return {...acc, [key]: item[key]}
      }

      return acc
    }, {})
  }

  const debounce = (f, ms) => {
    let timer = null;

    return function (...args) {
      const onComplete = () => {
        f.apply(this, args);
        timer = null;
      }

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(onComplete, ms);
    };
  }

  window.helpers = window.helpers || {};
  window.helpers.pluck = pluck;
  window.helpers.debounce = debounce;
})();

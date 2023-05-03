<template>
    <div>
      <p>{{ message | capitalize }}</p>
      <p>{{ date | formatDate }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: 'hello vue',
        date: '2022-10-01'
      };
    },
    filters: {
      capitalize(value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      formatDate(value) {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }
  };
  </script>
  
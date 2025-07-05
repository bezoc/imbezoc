class NetlifyFormService {
    async sendEmail(formData) {
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            ...formData
          }).toString()
        });
  
        if (response.ok) {
          return { success: true };
        } else {
          throw new Error('Erro na submissão do formulário');
        }
      } catch (error) {
        console.error('Erro Netlify Forms:', error);
        return { success: false, error: error.message };
      }
    }
  }
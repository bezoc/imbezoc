class NetlifyFormService {
  async sendEmail(formData) {
    try {
      // Prepara os dados para Netlify Forms
      const formBody = new URLSearchParams();
      formBody.append('form-name', 'contact');
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('subject', formData.subject);
      formBody.append('message', formData.message);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: formBody.toString()
      });

      if (response.ok) {
        console.log('Formulário enviado com sucesso para Netlify');
        return { success: true };
      } else {
        const errorText = await response.text();
        throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Erro Netlify Forms:', error);
      return { 
        success: false, 
        error: error.message || 'Erro de conexão com o servidor' 
      };
    }
  }
}
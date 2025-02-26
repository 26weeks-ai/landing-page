type ScriptAttributes = {
  async?: boolean;
  defer?: boolean;
  id?: string;
  onLoad?: () => void;
  onError?: (error: ErrorEvent) => void;
};

/**
 * Dynamically loads a script with specified attributes
 * This helps improve performance by loading scripts only when needed
 */
export function loadScript(src: string, attributes: ScriptAttributes = {}): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      return resolve(existingScript as HTMLScriptElement);
    }

    // Create and configure script element
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    
    // Apply attributes
    if (attributes.async) script.async = true;
    if (attributes.defer) script.defer = true;
    if (attributes.id) script.id = attributes.id;
    
    // Add event handlers
    script.onload = () => {
      if (attributes.onLoad) attributes.onLoad();
      resolve(script);
    };
    
    // Using the correct type for onerror handler
    script.onerror = function(this: GlobalEventHandlers, ev: Event | string): any {
      const errorEvent = typeof ev === 'string' ? new ErrorEvent('error', { message: ev }) : ev as ErrorEvent;
      if (attributes.onError) attributes.onError(errorEvent);
      reject(errorEvent);
      return true;
    };
    
    // Add to document to begin loading
    document.body.appendChild(script);
  });
}

/**
 * Preloads a script without executing it
 * Useful for scripts that will be needed soon but not immediately
 */
export function preloadScript(src: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Loads multiple scripts in parallel and returns a promise that resolves
 * when all scripts have loaded
 */
export function loadScripts(scripts: { src: string; attributes?: ScriptAttributes }[]): Promise<HTMLScriptElement[]> {
  return Promise.all(scripts.map(script => loadScript(script.src, script.attributes)));
}

/**
 * Loads scripts sequentially in the specified order
 * Useful when scripts depend on each other
 */
export async function loadScriptsSequentially(scripts: { src: string; attributes?: ScriptAttributes }[]): Promise<HTMLScriptElement[]> {
  const loadedScripts: HTMLScriptElement[] = [];
  
  for (const script of scripts) {
    const loadedScript = await loadScript(script.src, script.attributes);
    loadedScripts.push(loadedScript);
  }
  
  return loadedScripts;
}
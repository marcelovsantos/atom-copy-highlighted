'use babel';

import { CompositeDisposable } from 'atom';
import FS from 'fs-plus';

export default {

    subscriptions: null,
    config: {
        style: {
            type: 'string',
            default: 'github',
            enum: ['agate', 'androidstudio', 'arduino-light', 'arta', 'ascetic', 'atelier-cave-dark', 'atelier-cave-light', 'atelier-dune-dark', 'atelier-dune-light', 'atelier-estuary-dark', 'atelier-estuary-light', 'atelier-forest-dark', 'atelier-forest-light', 'atelier-heath-dark', 'atelier-heath-light', 'atelier-lakeside-dark', 'atelier-lakeside-light', 'atelier-plateau-dark', 'atelier-plateau-light', 'atelier-savanna-dark', 'atelier-savanna-light', 'atelier-seaside-dark', 'atelier-seaside-light', 'atelier-sulphurpool-dark', 'atelier-sulphurpool-light', 'atom-one-dark', 'atom-one-light', 'brown-paper', 'codepen-embed', 'color-brewer', 'darcula', 'dark', 'darkula', 'default', 'docco', 'dracula', 'far', 'foundation', 'github', 'github-gist', 'googlecode', 'grayscale', 'gruvbox-dark', 'gruvbox-light', 'hopscotch', 'hybrid', 'idea', 'ir-black', 'kimbie.dark', 'kimbie.light', 'magula', 'mono-blue', 'monokai', 'monokai-sublime', 'obsidian', 'ocean', 'paraiso-dark', 'paraiso-light', 'pojoaque', 'purebasic', 'qtcreator_dark', 'qtcreator_light', 'railscasts', 'rainbow', 'school-book', 'solarized-dark', 'solarized-light', 'sunburst', 'tomorrow', 'tomorrow-night-blue', 'tomorrow-night-bright', 'tomorrow-night', 'tomorrow-night-eighties', 'vs', 'xcode', 'xt256', 'zenburn'],
        }
    },
      

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'copy-highlighted:copy': () => this.copy(),
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
    },

    copy() {
        
        var editor = atom.workspace.getActiveTextEditor();
        
        var grammar = editor.buffer.file.path.replace(/.+\./, '');
        
        var source = editor.getSelectedText() || editor.getText();
        
        FS.readFile(__dirname + '/../node_modules/highlight.js/styles/' + atom.config.get('copy-highlighted.style') + '.css', 'utf8', function(error, css) {
            
            var hljs = require('highlight.js');
            
            var juice = require('juice');
            
            var clipboard = require('clipboard-js');
            
            var highlighted = hljs.highlight(grammar, source).value;
            
            highlighted = juice.inlineContent(highlighted, css);
            
            highlighted = '<pre style="font-size: 1em;">' + highlighted + '</pre>';
            
            clipboard.copy({
                "text/plain": source,
                "text/html": highlighted
            });
        });
    },

};
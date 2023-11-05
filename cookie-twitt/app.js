	'use strict';
	// get module

	var manager = iframemanager();

	manager.run({          
		currLang: document.documentElement.getAttribute('lang'),
		// autoLang: true,
		 services : {	
		            twitter : {
		            onAccept: async (div, setIframe) => {
		                await loadScript('https://platform.twitter.com/widgets.js');
		                await im.childExists({childProperty: 'twttr'});
		                const tweet = await twttr.widgets.createTweet(div.dataset.id, div.firstElementChild);
		                tweet && setIframe(tweet.firstChild);
		            },
		
		            onReject: async (iframe, serviceDiv, showNotice) => {
		                await im.childExists({parent: serviceDiv});
		                showNotice();
		                serviceDiv.querySelector('.twitter-tweet').remove();
		            },
		
		            languages : {
		              en : {
		              notice: 'Dieser Inhalt wird von einem Drittanbieter gehostet. Durch die Anzeige des externen Inhalts akzeptieren Sie die <a rel="noreferrer" href="https://twitter.com/de/tos" title="Allgemeine Geschäftsbedingungen" target="_blank">Allgemeine Geschäftsbedingungen </a> von twitter.com.',
		              loadBtn: 'Laden',
		              loadAllBtn: 'Nicht noch einmal fragen'
		                }
		            }
			} 
		     }	 
		       
	     });

	var accept_all = document.getElementById('accept-all');
	var reject_all = document.getElementById('reject-all');

	accept_all.addEventListener('click', function(){
		console.log("clicked accept-all");
		manager.acceptService('all');
	});

	reject_all.addEventListener('click', function(){
		console.log("clicked reject-all");
		manager.rejectService('all');
	});

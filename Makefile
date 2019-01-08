BUILD=1
DATE=`date +%Y%m%d`

prod:
	cp cfg/templates/prod.js src/config.js
	sed -i s/BUILDNO/$(DATE).$(BUILD)/ src/config.js
	npm run build
	tar -czf front_$(DATE)-$(BUILD).tar.gz dist/*

dev:
	cp cfg/templates/dev.js src/config.js
	sed -i s/BUILDNO/$(DATE).$(BUILD)/ src/config.js
	npm run dev

test:
	cp cfg/templates/test.js src/config.js
	sed -i s/BUILDNO/$(DATE).$(BUILD)/ src/config.js
	npm run dev

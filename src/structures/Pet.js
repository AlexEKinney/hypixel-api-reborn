const Utils = require('../utils');
/**
 * Pet Class
 */
class Pet {
  /**
     *
     * @param {string} name Name of pet
     * @param {object} data data
     */
  constructor (name, data) {
    /**
     * Is Pet Favorite
     * @type {boolean}
     */
    this.isFavorite = Boolean(data.vanityFavorites.includes(name.toUpperCase()));
    name = name.replace('pet_', '');
    /**
     * Official Name of the pet
     * @type {string}
     */
    this.name = Utils.removeSnakeCase.recursive(name) || null;
    /**
     * Is Active Pet
     * @type {boolean}
     */
    this.active = data.currentPet === name.toUpperCase();
    const stats = data.petStats[name.toUpperCase()];
    /**
     * Stats of the pet, if any
     * @type {object}
     */
    this.stats = {};
    if (!stats) return; // don't parse stats because there is none.
    /**
     * Hunger value ( 100 is highest )
     * @type {number|null}
     */
    this.stats.hunger = stats.HUNGER.value || null;
    /**
     * Last time the pet was fed ( timestamp )
     * @type {number|null}
     */
    this.stats.lastFed = stats.HUNGER.timestamp || null;
    /**
     * Last time the pet was fed ( Date )
     * @type {Date|null}
     */
    this.stats.lastFedAt = this.stats.lastFed ? new Date(this.stats.lastFed) : null;
    /**
     * Thirst value ( 100 is highest )
     * @type {number|null}
     */
    this.stats.thirst = stats.THIRST.value || null;
    /**
     * Last time the pet drank ( timestamp )
     * @type {number|null}
     */
    this.stats.lastDrank = stats.THIRST.timestamp || null;
    /**
     * Last time the pet drank ( Date )
     * @type {Date|null}
     */
    this.stats.lastDrankAt = this.stats.lastDrank ? new Date(this.stats.lastDrank) : null;
    /**
     * Exercise/Entertainment value ( 100 is highest )
     * @type {number|null}
     */
    this.stats.exercise = stats.EXERCISE.value || null;
    /**
     * Last time the pet was exercised ( timestamp )
     * @type {number|null}
     */
    this.stats.lastExercised = stats.EXERCISE.timestamp || null;
    /**
     * Last time the pet exercised ( Date )
     * @type {Date|null}
     */
    this.stats.lastExercisedAt = this.stats.lastExercised ? new Date(this.stats.lastExerciced) : null;
    /**
     * Raw Nickname, if any
     * @type {string}
     */
    this.rawNickname = stats.name || null;
    /**
     * Nickname in plain text, if any
     * @type {string}
     */
    this.nickname = this.nickname ? this.nickname.replace(/§([0-9]|[a-f])|§/gm, '') : null;
    /**
     * Pet experience
     * @type {number}
     */
    this.experience = stats.experience;
    /**
     * Pet level
     * @type {number}
     */
  }
}

module.exports = Pet;

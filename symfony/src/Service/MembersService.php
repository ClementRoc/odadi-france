<?php

declare(strict_types=1);

namespace App\Service;

use App\DTO\MediaDTO;
use App\DTO\MemberDTO;
use App\Exception\HydrateObjectContentfulException;
use Contentful\Delivery\Resource\Entry;
use Exception;

class MembersService
{
    private $contentfulService;

    public function __construct(
        ContentfulService $contentfulService
    ) {
        $this->contentfulService = $contentfulService;
    }

    public function getMembers(): array
    {
        $members    = $this->contentfulService->getEntriesByContentType('member');
        $membersDTO = [];

        if (current($members->getIterator()) !== null) {
            foreach($members as $member) {
                $membersDTO[] = $this->hydrateMemberDTO($member);
            }
        }

        return $membersDTO;
    }

    private function hydrateMemberDTO(Entry $item): MemberDTO
    {
        $memberDTO = new MemberDTO();

        $memberDTO->picture = $this->checkMedia($item, 'picture');
        $memberDTO->phone = $this->checkAttribute($item, 'phone');
        $memberDTO->mail = $this->checkAttribute($item, 'mail');
        $memberDTO->job = $this->checkAttribute($item, 'job');
        $memberDTO->description = $this->checkAttribute($item, 'description');

        return $memberDTO;
    }

    /**
     * @throws HydrateObjectContentfulException
     */
    private function checkAttribute(Entry $entry, string $attribute)
    {
        if (!$entry->get($attribute)) {
            throw new HydrateObjectContentfulException(
                $attribute,
                $entry->getSystemProperties()->getContentType()->getName(),
                $entry->getSystemProperties()->getId()
            );
        }

        return $entry->get($attribute);
    }

    /**
     * @throws HydrateObjectContentfulException
     */
    private function checkMedia(Entry $entry, string $attribute): MediaDTO
    {
        if (!$entry->get($attribute)) {
            throw new HydrateObjectContentfulException(
                $attribute,
                $entry->getSystemProperties()->getContentType()->getName(),
                $entry->getSystemProperties()->getId()
            );
        }

        return $this->contentfulService->getContentfulMedia($entry, $attribute);
    }
}